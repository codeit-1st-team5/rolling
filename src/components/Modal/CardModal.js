import Modal from './ModalPortal';
import { SubPrimaryButton } from 'components/button/Button';
import styled from 'styled-components';
import FamilyBadge from 'components/Badges/FamilyBadge';
import FriendBadge from 'components/Badges/FriendBadge';
import CoworkerBadge from 'components/Badges/CoworkerBadge';
import OtherBadge from 'components/Badges/OtherBadge';
import changeDateFormat from 'utils/calcCreateAt';

function CardModal({ onClose, data }) {
  const {
    imageUrl,
    createdAt,
    content = '내용이 없습니다',
    sender = '익명',
    relationship = '친구',
    font = 'Noto Sans',
  } = data;

  const timeStamp = changeDateFormat(createdAt, 'YYYY.MM.DD');
  const handleBadge = (relationType) => {
    switch (relationType) {
      case '가족':
        return <FamilyBadge />;
      case '친구':
        return <FriendBadge />;
      case '동료':
        return <CoworkerBadge />;
      case '지인':
        return <OtherBadge />;
    }
  };
  const handleFontType = (fontType) => {
    switch (fontType) {
      case 'Noto Sans':
        return 'Noto Sans';
      case 'Pretendard':
        return 'Pretendard, Noto Sans';
      case '나눔명조':
        return '나눔명조, Noto Sans';
      case '나눔손글씨 손편지체':
        return '나눔손글씨 손편지체, Noto Sans';
    }
  };

  return (
    <Modal onClick={onClose}>
      <CardWrapper>
        <ProfileWrapper>
          <ProfileImage src={imageUrl} alt="card-profile" />
          <ProfileContentWrapper>
            <ProfileNameWrapper>
              <ProfileContentText>From.</ProfileContentText>
              <ProfileContentText weight={700}>{sender}</ProfileContentText>
            </ProfileNameWrapper>
            {handleBadge(relationship)}
          </ProfileContentWrapper>
          <CardTimeStamp>{timeStamp}</CardTimeStamp>
        </ProfileWrapper>
        <CardContent fontStyle={handleFontType(font)}>{content}</CardContent>
        <SubPrimaryButton onClick={onClose} title="확인" />
      </CardWrapper>
    </Modal>
  );
}

export default CardModal;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 16px;
  width: 600px;
  min-width: 300px;
  height: 476px;
  position: absolute;
  background-color: white;
  z-index: 999;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 40px 40px 20px 40px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme['--gray-200']};
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme['--gray-200']};
`;

const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const ProfileContentText = styled.span`
  color: ${({ theme }) => theme.black};
  font-size: 20px;
  font-style: normal;
  font-weight: ${({ weight }) => weight || 400};
  line-height: 24px;
  ${({ theme }) => theme.mobile`
    font-size: 18px;
  `}
`;

const CardContent = styled.div`
  color: ${({ theme }) => theme['--gray-600']};
  height: 240px;
  width: 100%;
  margin: 16px 40px 24px;
  text-align: left;
  padding: 0 15px 0 0;
  overflow-y: scroll;
  word-break: break-all;
  font-size: 18px;
  font-family: ${(props) => props.font};
  line-height: 26px;
  letter-spacing: -0.18px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme['--gray-300']};
    border-raiud: 16px;
  }
`;

const CardTimeStamp = styled.span`
  color: ${({ theme }) => theme['--gray-400']};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.06px;
  position: absolute;
  right: 40px;
`;
