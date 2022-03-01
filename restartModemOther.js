const puppeteer = require('puppeteer')
const screenshot = 'restart.png';
(async () => {
  console.log('start...')
  const browser = await puppeteer.launch({ headless: true, defaultViewport: null, args: ['--start-maximized'] })
  const page = await browser.newPage()
  console.log('open browser...')
  await page.goto('http://192.168.1.1/')
  await page.type('#txt_Username', 'admin')
  await page.type('#txt_Password', 'yourPass')
  await page.evaluate(() => {
    LoginSubmit('loginbutton');
  });
  await page.waitForTimeout(8000)
  console.log('logged...')
  
  const frame = await page.frames().find(f => f.name() === 'menuIframe');
  const restartDivButton = await frame.$('#RestartDiv');
  restartDivButton.click();
  await page.waitForTimeout(1000);
  
  page.on('dialog', async dialog => {
    console.log('reboot accept');
    await dialog.accept();
  });
  
  const configFrame = await page.frames().find(f => f.name() === 'routermngtpageSrc');
  const btnRebootButton = await configFrame.$('#btnReboot');
  btnRebootButton.click();
  await page.waitForTimeout(1000);
  
  console.log('reboot')

  await page.waitForTimeout(1000)
  //await page.screenshot({ path: screenshot })
  browser.close()
  console.log('ok... 0-0-')
  //console.log('See screenshot: ' + screenshot)
})()