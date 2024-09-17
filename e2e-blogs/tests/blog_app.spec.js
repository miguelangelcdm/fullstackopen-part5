const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, newTestBlog } = require("./helper");

describe("Blog app", () => {
    beforeEach(async ({ page, request }) => {
        // empty the db here
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Miguelangel Garay',
                username: 'oldmostold',
                password: 'password'
            }
        })
        await request.post('http://localhost:3001/api/users', {
            data: {
                name: 'Miguelangel Junior',
                username: 'oldmostold2',
                password: 'password'
            }
        });
        await page.goto("/")
        await page.getByRole("button", { name: "Log In" }).click();
    });

    //5.17
    test("Login form is shown", async ({ page }) => {
        // await page.getByRole("button", { name: "Log In" }).click();
        await expect(page.locator('input[name="username"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
        await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
    });
    //5.18
    describe("Login", () => {
        test("succeeds with correct credentials", async ({ page }) => {
            loginWith(page, 'oldmostold', 'password')
            await expect(page.getByText('Welcome')).toBeVisible()
        });

        test("fails with wrong credentials", async ({ page }) => {
            loginWith(page, 'oldmostold', '')
            await expect(page.getByText('Wrong credentials')).toBeVisible()
        });
    });
    const title = 'test blog'
    const author = 'oldmostold'
    const url = 'https://fullstackopen.com/'
    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'oldmostold', 'password')
            await newTestBlog(page, title, author, url)
            await page.waitForSelector(`.blog-title:has-text("${title}")`);

        })
        //5.19
        test('a new blog can be created', async ({ page }) => {            
            await expect(page.getByText(`a new blog "${title}" by ${author} added`)).toBeVisible()
        })
        //5.20
        test('a blog can be liked', async ({ page }) => {
            await page.getByRole("button", { name: 'show' }).click()

            const likesBefore = await page.locator('[name= "likes"]').textContent()
            await page.getByRole("button", {name: 'like'}).click()
            const likesAfter = page.locator('[name= "likes"]')
            await expect(likesAfter).toHaveText((Number(likesBefore) + 1).toString())
        })
        //5.21
        test('a user can delete its blog', async ({ page }) => {
            await page.getByRole("button", { name: 'show' }).click()
            const blogContainer = page.locator(`span:has-text("${title}")`)
            await expect(blogContainer).toBeVisible()
            page.on('dialog', async dialog => await dialog.accept())
            await page.getByRole("button", { name: 'delete' }).click()
            await expect(blogContainer).not.toBeVisible()
        })

        //5.22
        test('a user should only see the delete button of its own blogs', async ({ page }) => {
            await expect(page.getByRole("button", { name: 'delete' })).toBeVisible();
            await page.getByRole("button", { name: 'logout' }).click();
            await page.getByRole("button", { name: 'Log In' }).click();
            await loginWith(page, 'oldmostold2', 'password');
            await expect(page.getByRole("button", { name: 'delete' })).not.toBeVisible();
        });

        
    });
    describe('When multiple blogs', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'oldmostold', 'password')
            for (let i = 0; i < 3; i++) {
                await newTestBlog(page, `blog${i+1}`, author, url);
                await page.waitForSelector(`.blog-title:has-text("blog${i+1}")`);
                await page.locator(`.blog-title:has-text("blog${i+1}")`)
                    .locator('..')
                    .locator('..')
                    .locator('..')
                    .locator('..')
                    .locator('button:has-text("show")')
                    .click();
            
                for (let j = 0; j < i+1; j++) {
                    await page.locator(`.blog-title:has-text("blog${i+1}")`)
                        .locator('..')
                        .locator('..')
                        .locator('button:has-text("like")')
                        .click();

                        await page.waitForTimeout(100);
                }

                await expect(page.locator(`.blog-title:has-text("blog${i+1}")`)
                    .locator('..')
                    .locator('..')
                    .locator('.blog-likes')).toHaveText(`${i+1}`);
            }
        })
        //5.23
        test('are ordered by likes in descending order', async ({ page }) => {
            const blogElements = await page.locator('.blog-likes').all();
            const blogLikes = await Promise.all(blogElements.map(async (el) => {
                return parseInt(await el.textContent(), 10);
            }));

            for (let i = 0; i < blogLikes.length - 1; i++) {
                expect(blogLikes[i]).toBeGreaterThanOrEqual(blogLikes[i + 1]);
            }
        });
        
    });

});
