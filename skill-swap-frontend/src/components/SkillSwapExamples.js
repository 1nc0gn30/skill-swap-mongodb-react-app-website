import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import swapexamples from './data/swapexamples.json';

const Root = styled('div')({
  flexGrow: 1,
  padding: 16,
  width: '90%',
  margin: 'auto', // Center the carousel
});

const SkillSwapExamples = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Root>
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        autoPlay={true}
        onChange={(current) => setCurrentSlide(current)}
        selectedItem={currentSlide}
        style={{ width: '90%' }} // Make the carousel fill the parent container
      >
        {swapexamples.map((swap, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                padding: 2,
                margin: 2,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {swap.title}
                </Typography>
                <Typography variant="body1">
                  {swap.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Carousel>
    </Root>
  );
};

export default SkillSwapExamples;
