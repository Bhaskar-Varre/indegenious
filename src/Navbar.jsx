import React from 'react';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DescriptionIcon from '@mui/icons-material/Description';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { Icon } from '@mui/material';
import './Navbar.css'

const NavBar = () => {
  return (
    <nav className='navbar'>
      <Icon><TravelExploreIcon/></Icon> <a href="/" style={{ marginRight: '20px' }}>Research</a> 
      <Icon><DescriptionIcon/></Icon><a href="/"  style={{ marginRight: '20px' }}></a> 
      <Icon><FormatQuoteIcon/></Icon>
      
    </nav>
  );
};

export default NavBar;
