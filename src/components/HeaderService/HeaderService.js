// import { Emoji } from 'emoji-picker-react';
import styled from 'styled-components';
import Emoji from 'components/Emoji/Emoji';
import ShareTab from 'components/ShareTab/ShareTab';
import ProfileAndMessage from './ProfileAndMessage';

function HeaderService({ card }) {
  return (
    <HeaderServiceLayout>
      <div className="header-service-container">
        {
          <>
            <div className="to">To. {card.name} </div>

            <div className="header-service-contents">
              <ProfileAndMessage card={card} type="headerService" />
              <Emoji />
              <ShareTab />
            </div>
          </>
        }
      </div>
    </HeaderServiceLayout>
  );
}

export default HeaderService;

const HeaderServiceLayout = styled.nav`
  position: fixed;
  top: 62px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme[`white`]};
  border-bottom: 1px solid ${({ theme }) => theme[`--gray-300`]};
  display: flex;
  justify-content: center;
  align-items: center;

  .header-service-container {
    padding: 11px 24px;
    height: 62px;
    width: 1248px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .to {
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: -0.28px;
    white-space: nowrap;
  }

  .header-service-contents {
    display: flex;
    align-items: center;
    gap: 26px;
  }
`;
