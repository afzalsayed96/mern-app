import React from 'react'
import Link from 'next/link'
import { Divider } from '@material-ui/core'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href='create'>
          <a>Register</a>
        </Link>
      </li>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <a href='https://github.com/afzalsayed96'>
          Github
        </a>
      </li>
    </ul>
    <Divider variant="inset" />

    <style jsx>{`
      :global(.MuiDivider-root.MuiDivider-inset) {
        margin-right: 72px;
      }
      :global(body) {
        margin: 0;
        font-family: 'Product Sans Regular', -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
        z-index: 1;
        position: relative;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
