import React from 'react'

const ProfilePage = () => {
  return (
    <div>
      <p>
        I am a web developer helping make the world a better place through
        JavaScript, Ruby, and UI design.
      </p>
      <p>
        I am an open-source contributor and I like making things that help
        people with their work. I am the author of{' '}
        <a href='https://github.com/rstacruz/pnpm'>pnpm</a>,{' '}
        <a href='http://rscss.io'>rscss</a>,{' '}
        <a href='https://devhints.io'>Devhints</a>,{' '}
        <a href='https://ricostacruz.com/jquery.transit'>Transit</a>,{' '}
        <a href='http://js2.coffee'>Js2coffee</a>,{' '}
        <a href='https://ricostacruz.com/nprogress'>Nprogress</a>,{' '}
        <a href='https://ricostacruz.com/flatdoc'>Flatdoc</a>,
        <a href='https://github.com/mina-deploy/mina'>Mina</a>,{' '}
        <a href='https://github.com/rstacruz/backbone-patterns'>
          Backbone Patterns
        </a>
        , and <a href='https://github.com/rstacruz'>many more</a>.
      </p>
      <p>
        I spoke in <a href='http://2014.cssconf.asia/'>CSSConf Asia 2014</a>,
        hosted <a href='http://2013.jsconf.asia/'>JSConf Asia 2013</a>, manage
        the <a href='http://manilajs.com/'>Manila.js</a> community, and often
        speak in conferences.
      </p>
      <p>
        <a href='https://ricostacruz.com/til'>I blog about web development</a>.
      </p>
      <p>
        <strong>
          <a href='https://twitter.com/rstacruz'>
            You should follow me on Twitter.
          </a>
        </strong>{' '}
        You can write to me through{' '}
        <a href='mailto:hi@ricostacruz.com'>hi@ricostacruz.com</a>.
      </p>
      <div className='links'>
        <a href='https://twitter.com/rstacruz'>
          <i className='ion-social-twitter-outline'></i>
        </a>
        <a href='https://github.com/rstacruz'>
          <i className='ion-social-github-outline'></i>
        </a>
        <a href='https://dribbble.com/rstacruz'>
          <i className='ion-social-dribbble-outline'></i>
        </a>
        <a href='https://ph.linkedin.com/in/ricostacruz'>
          <i className='ion-social-linkedin'></i>
        </a>
      </div>
      <div className='signature'>— @rstacruz</div>
      <div className='post-list'></div>
    </div>
  )
}

export default ProfilePage
