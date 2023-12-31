import styled, { css } from 'styled-components';
import { MainPrimaryButton } from 'components/Button/Button';
import { useEffect, useState } from 'react';
import PostForm from 'components/CreatePost/PostForm';
import useRequest from 'hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner/Spinner';
import openToast from 'utils/openToast';

function CreatePostPage() {
  const navigate = useNavigate();
  const INITIAL_VALUES = {
    team: '5',
    name: '',
    backgroundColor: 'beige',
    backgroundImageURL: '',
  };

  const [currentTab, setCurrentTab] = useState(0);
  const [values, setValues] = useState(INITIAL_VALUES);
  const [isInputError, setIsInputError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const { data, fetcher, isLoading } = useRequest({
    url: `1-5/recipients/`,
    method: 'post',
    data: values,
    skip: true,
  });

  const handleInputErrorChange = (isError) => {
    setIsInputError(isError);
    setIsDisabled(isError);
  };

  const handleValuesChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleTabChange = (e, key) => {
    e.preventDefault();
    setCurrentTab(key);
  };

  const handleSubmit = async () => {
    if (!isInputError) {
      try {
        await fetcher();
        openToast({ type: 'success', txt: '롤링페이퍼를 만들었습니다.' });
      } catch (err) {
        console.error('error : ', err);
        openToast({
          type: 'error',
          txt: '롤링페이퍼를 만드는데 실패했습니다.',
        });
      }
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      return navigate(`/post/${data.id}`);
    }
  }, [data]);

  return (
    <Container>
      <ContentsWrapper>
        <FormWrapper>
          <PostForm
            currentTab={currentTab}
            handleTabChange={handleTabChange}
            handleValuesChange={handleValuesChange}
            name={values.name}
            isInputError={isInputError}
            handleInputErrorChange={handleInputErrorChange}
          />
        </FormWrapper>
        <SubmitButton
          title={isLoading ? <ResizedSpinner /> : '생성하기'}
          disabled={isDisabled}
          onClick={handleSubmit}
        />
      </ContentsWrapper>
    </Container>
  );
}

export default CreatePostPage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 57px;
  ${flexCenter};
  flex-direction: column;

  // Tablet
  @media (min-width: 768px) and (max-width: 1199px) {
    margin-top: 49px;
  }

  // Mobile
  @media (max-width: 767px) {
    margin-top: 50px;
  }
`;

const ContentsWrapper = styled.div`
  width: 100%;
  max-width: 768px;
  ${flexCenter};
  flex-direction: column;
  margin: 0 24px;
  gap: 69px;

  ${({ theme }) => theme.tablet`
    margin-bottom: 106px;
  `};
`;

const FormWrapper = styled.div`
  padding: 0 24px;
  width: 100%;
`;

const SubmitButton = styled(MainPrimaryButton)`
  width: 100%;
  max-width: 720px;

  ${({ theme }) => theme.tablet`
    width: 94%;
    position: fixed;
    bottom: 24px;
  `};
`;

const ResizedSpinner = styled(Spinner)`
  height: 27.98px;
  & img {
    width: 25px;
    height: 25px;
  }
`;
