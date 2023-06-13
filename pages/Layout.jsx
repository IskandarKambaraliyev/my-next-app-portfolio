import Navbar, { navHeight } from '@/components/navbar/Navbar';
import SocialMedia from '@/components/socialMedia/SocialMedia';
import React from 'react';

const Layout = ({children}) => {
  return (
    <div className="layout">
        <Navbar />
        <SocialMedia />
        <main className='main' style={{paddingTop: navHeight ? navHeight+"px" : "100px"}}>{children}</main>
    </div>
  )
}

export default Layout