// People First Jobs - Scraper
const rcoScraper = async (browser, url) => {
  const incContext = await browser.createIncognitoBrowserContext();
  const page = await incContext.newPage();
  await page.goto(url);

  const content = await page.waitForSelector('div.col');
  const rcoJobs = await content.$$eval('div.card-body', (categories) => {
    // const jobs = categories.map(async (category) => {
    //   const seeAll = category.lastChild.lastChild;
    //   const categoryPage = await Promise.all([
    //     page.waitForNavigation(),
    //     page.click(seeAll),
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

  return { rcoJobs };
};

module.exports = {
  rcoScraper,
};
