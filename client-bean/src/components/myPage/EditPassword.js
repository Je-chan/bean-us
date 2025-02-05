import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { H2 } from '../../styles/signs/SignTitle';
import SignButton from '../../styles/signs/SignButton';

import { passwordValidation } from '../../utils/validation';
import { passwordChange } from '../../network/myPage/myPage';

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  } to {
    transform: translateY(0px)
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0
  } to {
    opacity: 1
  }
`;

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
  animation: ${fadeIn} 0.25s ease-out;
`;

const Container = styled.div`
  width: 450px;
  padding: 15px 0 0 25px;
  background-color: #eee;
  position: relative;
  border-radius: 20px;
  background: #f9f9f9;
  box-sizing: border-box;
  animation: ${slideUp} 0.25s ease-out;
  transition: all 0.5s;
`;

const LineWrapper = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
`;

const P = styled.p`
  width: 120px;
  font-size: 17px;
  font-family: 'BMHANNAAir';
`;

const Input = styled.input`
  margin-left: 5px;
  width: 230px;
  height: 30px;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);

  &:focus {
    outline: none;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.8);
  }
`;

const ValidMessage = styled.p`
  margin: 0 0 0 158px;
  font-size: 12px;
  color: #95673d;
`;

const ErrorMessage = styled.p`
  margin-top: 16px;
  text-align: center;
  color: #956739;
`;

export default function EditPassword({ userId, editPasswordClickHandler }) {
  const [curPwd, setCurPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');

  const [isValidPassword, setIsValidPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [isMatchedPassword, setIsMatchedPassword] = useState('');

  const [isValidRequest, setIsValidRequest] = useState('');

  const inputHandler = (e) => {
    if (e.target.name === 'curPwd') {
      console.log('eh');
      setCurPwd(e.target.value);
    } else if (e.target.name === 'newPwd') {
      setNewPwd(e.target.value);
      if (e.target.value && !passwordValidation(e.target.value)) {
        setIsValidPassword('8~16자, 최소 하나의 숫자와 특수문자가 필요합니다');
      } else {
        setIsValidPassword('');
      }
    } else if (e.target.name === 'newPwdCheck') {
      if (e.target.value === '') {
        setCheckPassword('');
      } else if (e.target.value !== newPwd) {
        setCheckPassword('비밀번호가 일치하지 않습니다');
      } else {
        setCheckPassword('비밀번호가 일치합니다');
      }
    }
  };

  const editPassword = () => {
    if (isValidPassword === '' && checkPassword === '비밀번호가 일치합니다') {
      passwordChange(userId, curPwd, newPwd).then((res) => {
        if (res.data.data) {
          editPasswordClickHandler();
          alert(res.data.message);
        } else {
          setIsMatchedPassword(res.data.message);
        }
      });
    } else {
      setIsValidRequest('형식에 맞추어 작성해주세요');
    }
  };

  return (
    <Background>
      <Container>
        <H2>비밀번호 변경</H2>
        <LineWrapper>
          <P>현재 비밀번호</P>
          <Input name='curPwd' onChange={inputHandler} type='password'></Input>
        </LineWrapper>
        <ValidMessage>{isMatchedPassword}</ValidMessage>
        <LineWrapper>
          <P>새 비밀번호</P>
          <Input name='newPwd' onChange={inputHandler} type='password'></Input>
        </LineWrapper>
        <ValidMessage>{isValidPassword}</ValidMessage>
        <LineWrapper>
          <P>새 비밀번호 확인</P>
          <Input name='newPwdCheck' onChange={inputHandler} type='password'></Input>
        </LineWrapper>
        <ValidMessage>{checkPassword}</ValidMessage>
        <ErrorMessage>{isValidRequest}</ErrorMessage>
        <SignButton
          marginLeft='45px'
          marginBottom='40px'
          marginTop='20px'
          leftBtn='비밀번호 변경 취소'
          rightBtn='비밀번호 변경'
          leftBtnHandler={editPasswordClickHandler}
          rightBtnHandler={editPassword}
        ></SignButton>
      </Container>
    </Background>
  );
}
