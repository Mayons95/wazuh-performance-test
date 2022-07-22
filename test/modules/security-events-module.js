module.exports = async function(context, commands) {
    // Navigate to a URL, but do not measure the URL
    await commands.navigate(
      'http://localhost:5601'
    );
  
    try {
      // Start collecting metrics
      await commands.measure.start('login')
      await commands.wait.bySelector('button[data-test-subj="toggleNavButton"]', 500)
      await commands.click.bySelector('button[data-test-subj="toggleNavButton"]')
      await commands.wait.bySelector('a[href$="/app/wazuh"]', 5000)
      await commands.click.bySelector('a[href$="/app/wazuh"]')
      await commands.wait.byXpath('//*[contains(@class,"euiTitle euiTitle--small euiCard__title")]//*[contains(text(),"Security events")]', 5000) 
      await commands.click.bySelector('[data-test-subj=menuWazuhButton]')
      await commands.wait.bySelector('[data-test-subj="overviewWelcomeGeneral"]', 5000)
      await commands.click.bySelector('[data-test-subj="overviewWelcomeGeneral"]')
      await commands.wait.bySelector('.wz-welcome-page-agent-tabs button.euiTab.euiTab-isSelected:first-child', 5000)
      // Stop and collect the metrics
      return commands.measure.stop();
    } catch (e) {
      // We try/catch so we will catch if the the input fields can't be found
      // The error is automatically logged in Browsertime an rethrown here
      // We could have an alternative flow ...
      // else we can just let it cascade since it caught later on and reported in
      // the HTML
      throw e;
    }
  };
  