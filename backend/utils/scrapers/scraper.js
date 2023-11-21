const puppeteer = require('puppeteer');

const { pfjScraper } = require('./pfjScraper');
const { rcoScraper } = require('./rcoScraper');
const { wwrScraper } = require('./wwrScraper');

// Browser instance creator
async function startBrowser() {
  let browser;

  try {
    console.log('Opening the browser...');
    browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === 'production',
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: true,
    });
  } catch (err) {
    console.warn('Could not create a browser instance => : ', err);
  }

  return browser;
}

// Page Scraper
const pageScraper = {
  async scraper(browser) {
    const urls = [
      'https://peoplefirstjobs.com/jobs',
      'https://weworkremotely.com/remote-jobs/',
      'https://remote.co/remote-jobs/',
      'https://remotive.com/',
      'https://dynamitejobs.com/remote-jobs',
      'https://nodesk.co/remote-jobs/',
      'https://hnhiring.com/',
      'https://wellfound.com/jobs',
      'https://www.levels.fyi/jobs/',
      'https://cryptocurrencyjobs.co/',
      'https://web3.career/remote-jobs',
      'https://remotewx.com/',
      'https://elpha.com/jobs/',
      'https://4dayweek.io/remote-jobs/',
      'https://adevait.com/careers/job-openings',
    ];

    const jobs = await Promise.all([
      pfjScraper(browser, urls[0]),
      wwrScraper(browser, urls[1]),
      rcoScraper(browser, urls[2]),
    ]);

    await browser.close();

    return { jobs };
  },
};

// Scraper Controller
async function scraperController(browserInstance) {
  let browser;

  try {
    browser = await browserInstance;
    const jobs = await pageScraper.scraper(browser);
    return jobs;
  } catch (err) {
    console.warn('Could not resolve the browser instance => : ', err);
  }
}

const updateDatabase = async (jobsData) => {
  // TODO delete jobs in database that are over 30 days old
  // TODO if job not in database don't add only add those not present
};

const jobsScraper = async () => {
  const browserInstance = await startBrowser();
  const jobs = await scraperController(browserInstance);
  // TODO update database
  updateDatabase(jobs);
  return jobs;
};

// TODO - Comment back in to scrape every 24 hours
// setInterval(jobsScraper, 1000 * 60 * 60 * 24)
jobsScraper();
