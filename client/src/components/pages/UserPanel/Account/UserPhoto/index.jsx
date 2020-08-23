import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Header, Grid, Image, Divider, Button } from 'semantic-ui-react';

import { loadingSelector as createLoadingSelector } from '../../../../../redux/reducers/loading';
import { uploadUserPhoto } from '../../../../../redux/actions/user';
import ContentBox from '../../../../utils/ContentBox';
import DropzoneInput from './DropzoneInput';
import CropperInput from './CropperInput';

const UserPhoto = ({ currentUser, uploadUserPhoto, isLoading }) => {
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

  const handleUploadPhoto = async () => {
    await uploadUserPhoto(image);
    handleCancelCrop();
  };

  return (
    <div className="user-panel__photo">
      <ContentBox headingText="Your photo">
        <Image
          src={`${process.env.PUBLIC_URL}/img/users/${
            currentUser ? currentUser.photo : 'default.jpg'
          }`}
          bordered
        />
        <Divider />
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="grey" as="h4" content="Step 1 - Add Photo" />
            <DropzoneInput setFiles={setFiles} />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color="grey" as="h4" content="Step 2 - Resize image" />
            {files.length > 0 && (
              <CropperInput
                setImage={setImage}
                imagePreview={files[0].preview}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header color="grey" as="h4" content="Step 3 - Preview & Upload" />
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
                  <Button
                    className={isLoading ? 'loading' : ''}
                    icon="check"
                    positive
                    style={{ width: '10rem' }}
                    onClick={handleUploadPhoto}
                  />
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

const loadingSelector = createLoadingSelector(['UPLOAD_PHOTO']);

const mapStateToProps = state => ({
  isLoading: loadingSelector(state),
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps, { uploadUserPhoto })(UserPhoto);
