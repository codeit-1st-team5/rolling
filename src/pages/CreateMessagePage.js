import styled, { css } from 'styled-components';
import { MainPrimaryButton } from 'components/button/Button';
import { useEffect, useState } from 'react';
import useRequest from 'hooks/useRequest';
import { useNavigate } from 'react-router-dom';
import MessageForm from '../components/CreateMessage/MessageForm';

function CreateMessagePage() {
  const navigate = useNavigate();
  const INITIAL_VALUES = {
    team: '5',
    recipientId: '',
    sender: '',
    profileImageURL: '',
    relationship: '',
    content: '',
    font: '',
  };

  const [values, setValues] = useState(INITIAL_VALUES);
  const [isInputError, setIsInputError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const { data, fetcher } = useRequest({
    url: `1-5/recipients/{recipient_id}/messages/`,
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

  const handleSubmit = async () => {
    if (!isInputError) {
      try {
        await fetcher();
      } catch (err) {
        console.error('error : ', err);
      }
    }
  };

  useEffect(() => {
    if (data) {
      return navigate(`/post/${data.id}`);
    }
  }, [data]);

  return (
    <Container>
      <ContentsWrapper>
        <FormWrapper>
          <MessageForm
            handleValuesChange={handleValuesChange}
            name={values.name}
            isInputError={isInputError}
            handleInputErrorChange={handleInputErrorChange}
          />
        </FormWrapper>
        <SubmitButton
          title="생성하기"
          disabled={isDisabled}
          onClick={handleSubmit}
        />
      </ContentsWrapper>
    </Container>
  );
}

export default CreateMessagePage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  ${flexCenter};
  flex-direction: column;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  ${flexCenter};
  flex-direction: column;
  margin: 0 24px;
  gap: 69px;

  // Tablet And Mobile
  @media (max-width: 1199px) {
    margin-bottom: 106px;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  margin: 0 24px;
`;

const SubmitButton = styled(MainPrimaryButton)`
  width: 100%;
  max-width: 720px;

  // Tablet And Mobile
  @media (max-width: 1199px) {
    width: 94%;
    position: fixed;
    bottom: 24px;
  }
`;