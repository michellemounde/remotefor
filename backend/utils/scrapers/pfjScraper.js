// People First Jobs - Scraper
const pfjScraper = async (browser, url) => {
  const incContext = await browser.createIncognitoBrowserContext();
  const page = await incContext.newPage();
  await page.goto(url);

  const content = await page.waitForSelector('div.layout_content');
  const pfjJobs = await content.$$eval('ul.roles-list', (categories) => {
    // const jobs = categories.map(async (category) => {
    //   const categoryPage = await Promise.all([
    //     page.waitForNavigation(),
    //     page.click(category),
    //   ]);

    //   const categoryContent = await categoryPage.waitForSelector('div.layout_content');
    //   const categoryName = await categoryPage.$eval('h2.subtitle.subtitle--section', (h2) => h2.textContent);
    //   const categoryJobs = await categoryPage.$$eval('div.listing', (job) => {
    //     // TODO get data then return in obj below
    //     // return {
    //     //   company: {
    //     //     name:
    //     //     logo:
    //     //   },
    //     //   title:
    //     //   employmentType:
    //     //   location:
    //     //   salary:
    //     //   source: {
    //     //     name:
    //     //     url: // TODO add RemoteFor ref to link
    //     //   }
    //     //   sourceLink: // TODO add RemoteFor ref to link
    //     // }
    //   });
    // });
  });

  await incContext.close();

  return { pfjJobs };
};

module.exports = {
  pfjScraper,
};
