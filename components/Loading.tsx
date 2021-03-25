import React from 'react';
import styled from 'styled-components';

const Loading: React.FC = (): JSX.Element => {
    return (
        <Loader className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
            </div>
        </Loader>
    );
};

const Loader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 9999;
`;

export default Loading;
