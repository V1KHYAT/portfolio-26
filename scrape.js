import scrape from 'website-scraper';

const options = {
  urls: ['https://bymonolog.com/'],
  directory: './site',
  // by default it scrapes <img>, <link>, <script>, <style> and elements with inline styles
  plugins: []
};

scrape(options).then((result) => {
  console.log("Website downloaded successfully.");
}).catch((err) => {
  console.error("An error occurred", err);
});
