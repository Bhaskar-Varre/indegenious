import React, { useState } from 'react';
import { TextField, Button,  FormControlLabel, Switch, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';
import './css.css'

const CenteredBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAcademic, setIsAcademic] = useState(false);
  const navigate = useNavigate();

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
        navigate('/research', { state: { searchResults: response.data.data } });
      })
      .catch((error) => {
        console.error('Error searching publications:', error);
      });
      
  };


  return (
    <div>
      <NavBar />
      
      <CenteredBox>
      <TextField 
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '20px', width: '80%' }}
          InputProps={{
            endAdornment: (
              <FormControlLabel
                control={<Switch color='success' checked={isAcademic} onChange={() => setIsAcademic(!isAcademic)} />}
                label="Academic"
                style={{ marginLeft: '10px' }}
              />
            ),
          }}
        />
        <Button color='success' variant="contained" onClick={handleSearch}>
          Search the web
        </Button></CenteredBox>
      
    </div>
  );
};

export default LandingPage;
