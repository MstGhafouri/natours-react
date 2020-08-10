import React, { useState, useEffect } from 'react';
import { Header, Grid, Image, Divider, Button } from 'semantic-ui-react';

// import pic from '../../../../../assets/img/tours/tour-1-cover.jpg';
import ContentBox from '../../../../utils/ContentBox';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';

const UserPhoto = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  return (
    <div className="user-panel__photo">
      <ContentBox headingText="Your photo">
        <Image
          src={''}
          bordered
          style={{ width: '9rem', height: '8rem', borderRadius: '50%' }}
        />
        <Divider />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="grey" sub content="Step 1 - Add Photo" />
            <DropzoneInput setFiles={setFiles} />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="grey" content="Step 2 - Resize image" />
            {files.length > 0 && (
              <CropperInput
                setImage={setImage}
                imagePreview={files[0].preview}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="grey" content="Step 3 - Preview & Upload" />
            {files.length > 0 && (
              <React.Fragment>
                <div
                  className="img-preview"
                  style={{
                    minHeight: '20rem',
                    minWidth: '20rem',
                    overflow: 'hidden'
                  }}
                ></div>
                <Button.Group>
                  <Button icon="check" positive style={{ width: '10rem' }} />
                  <Button
                    icon="close"
                    style={{ width: '10rem' }}
                    onClick={handleCancelCrop}
                  />
                </Button.Group>
              </React.Fragment>
            )}
          </Grid.Column>
        </Grid>
      </ContentBox>
    </div>
  );
};

export default UserPhoto;
