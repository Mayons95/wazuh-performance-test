module.exports = async function(context, commands) {
    // Navigate to a URL, but do not measure the URL
    await commands.navigate(
      'http://localhost:5601'
    );
  
    try {
      
      await commands.measure.start('login')
      // Find the submit button and click it and wait for the
      // page complete check to finish on the next loaded URL
      //await commands.click.bySelector('button[data-test-subj="submit"]');
      await commands.wait.bySelector('button[data-test-subj="toggleNavButton"]', 2000)
      await commands.click.bySelector('button[data-test-subj="toggleNavButton"]')
      await commands.wait.bySelector('a[href$="/app/wazuh"]', 2000)
      await commands.click.bySelector('a[href$="/app/wazuh"]')
      await commands.wait.byXpath('//*[contains(@class,"euiTitle euiTitle--small euiCard__title")]//*[contains(text(),"Security events")]', 5000) 
      await commands.click.bySelector('[data-test-subj=menuWazuhButton]')
      await commands.wait.bySelector('[data-test-subj=menuAgentsButton]', 5000)
      await commands.click.bySelector('[data-test-subj=menuAgentsButton]')
      //await commands.waitbySelector('Selectordelgrafico de evolutions') poner aca selector del grafico de evolutions
      //await commands.click.bySelector('[data-test-subj=menuWazuhButton]');
      //await commands.bySelector('[data-test-subj=menuAgentsButton]', 20000);
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
  