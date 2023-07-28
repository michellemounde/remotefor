// People First Jobs - Scraper
const wwrScraper = async(browser, url) => {
  const incContext = await browser.createIncognitoBrowserContext();
  const page = await incContext.newPage();
  await page.goto(url);

  const content = await page.waitForSelector('div#job_list');
  const wwrJobs = await content.$$eval('section.jobs', categories => {
    jobs = categories.map(async(category) => {
      const categoryContent = await category.waitForSelector('ul');
      const categoryName = await categoryContent.$eval('h2', h2 => h2.firstChild.textContent);
      const categoryJobs = await categoryContent.$$eval('li', job => {
        // TODO get data then return in obj below
        return {
          company: {
            name:
            logo:
          },
          title:
          employmentType:
          location:
          salary:
          source: {
            name:
            url: // TODO add RemoteFor ref to link
          }
          sourceLink: // TODO add RemoteFor ref to link
        }
      })



    })
  })


  await incContext.close();

  return { wwrJobs }
}

module.exports = {
  wwrScraper
}
