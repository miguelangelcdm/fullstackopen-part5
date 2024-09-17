const loginWith = async (page, username, password) => {
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await Promise.race([
        page.waitForFunction(() => window.localStorage.getItem('loggedBlogappUser') !== null),
        page.waitForSelector('text=Wrong credentials')  // Modify this to match your error message
    ]);
};

const newTestBlog = async (page, title, author, url) => {

    const userData = await page.evaluate(() => window.localStorage.getItem('loggedBlogappUser'))
    if (userData) {
        console.log("User logged in")
    }else {
        throw new Error("User is not logged in")
    }
    await page.getByRole("button", { name: "add blog" }).click()
    await page.locator('input[name="title"]').fill(title)
    await page.locator('input[name="author"]').fill(author)
    await page.locator('input[name="url"]').fill(url)
    await page.getByRole('button', { name: 'save' }).click()
}

export { loginWith, newTestBlog }