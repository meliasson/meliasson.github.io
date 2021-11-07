(function () {
  const quotes = [
    {
      quote: 'Planning is everything, plans are nothing.',
      quotee: 'Field Marshal Helmuth Graf von Moltke'
    },
    {
      quote: 'If you tell people where to go, but not how to get there, you\'ll be amazed at the results.',
      quotee: 'General George S. Patton'
    },
    {
      quote: 'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
      quotee: 'Antoine de Saint-Exupery'
    },
    {
      quote: 'As a general rule of thumb, when benefits are not quantified at all, assume there aren\'t any.',
      quotee: 'Tom DeMarco and Timothy Lister'
    },
    {
      quote: 'The biggest cause of failure in software-intensive systems is not technical failure; it’s building the wrong thing.',
      quotee: 'Mary Poppendieck'
    },
    {
      quote: 'If you define the problem correctly, you almost have the solution.',
      quotee: 'Steve Jobs'
    },
  ]
  
  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  const quoteContainer = document.querySelector('.quote.cell div')
  const quote = quotes[getRandomInt(quotes.length)]
  quoteContainer.querySelector('p').innerHTML = '"' + quote.quote + '"'
  quoteContainer.querySelector('p:last-child').innerHTML = '&mdash;' + quote.quotee
})();
