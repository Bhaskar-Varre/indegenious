

import React, { useState } from 'react';
import { TextField, Button,FormGroup,  FormControlLabel, Switch, Box , Icon} from '@mui/material';

import axios from 'axios';
import NavBar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import './css.css'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';



const ResearchTab = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(location.state && location.state.searchResults);
  const [isAcademic, setIsAcademic] = useState(false);

  const handleback = () => {
    navigate('/');
  };

  const handleSearch = () => {
    const data = JSON.stringify({
      keyword: searchTerm,
      limit: '10',
      isAcademic: isAcademic ? 'academic' : 'non-academic',
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.gyanibooks.com/search_publication/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setSearchResults(response.data.data);
      })
      .catch((error) => {
        console.error('Error searching publications:', error);
      });
  };

  return (
    <div>
      <NavBar/>
      <div id='back1'onClick={handleback}><Icon id='back1'  ><ArrowBackIosNewIcon/></Icon><label style={{color:'gray' , fontWeight:'200'}}>Back</label></div>
      
      <div className='centerbox'>
      
      <FormGroup id='ac1'>
        <FormControlLabel className='toggle'
          control={<Switch color='success' checked={isAcademic} onChange={() => setIsAcademic(!isAcademic)} />}
          label="Academic"
        />
      </FormGroup>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', width: '80%' }}
        InputProps={{
          endAdornment: (
            <Button color='success' variant="contained" onClick={handleSearch}>
        <Icon><ArrowCircleRightIcon style={{alignContent:'center'}}/></Icon>
      </Button>
          ),
        }}
      />
      
      

        {/* Render search results */}
        {searchResults ? isAcademic
          ? <h2 >Academic Results</h2>
          : <h2 >web Results</h2>
        : ''}</div>
        
     <div style={{ marginTop: '20px', textAlign: 'center' }}>
        
          
        {searchResults&&searchResults.map((result) => (
          
          <div className='cards' key={result.id}>
            <><div id='bookmark' ><Icon color='success'><BookmarkBorderIcon /></Icon><label>Bookmark</label></div></>
            
            <h3>{result.title}</h3>
            <p>{result.abstract}</p>
            
            {!isAcademic && (
              <><div className='bt3'><Button color='success' variant='contained'>Get Content</Button></div>
              
              </>
            )}
            {isAcademic && (
              
              <>
              <div id='cardst'>
                <div><span>cited by {result.citationCount}</span></div>
                <div ><Button style={{marginRight:'5px'}} color='success' variant="outlined">Cite</Button>
                      <Button color='success' variant='contained'>Explore</Button></div>
              </div>
              </>
            )}
          
            
          </div>
        ))}
      </div></div>
  );
};

export default ResearchTab;
