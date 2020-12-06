import styled from 'styled-components';
import { darken } from 'polished';

export const Product = styled.div`
  display: flex;
  list-style: none;
  background: #fff;
  border-radius: 4px;
  padding: 40px;
  flex-wrap: wrap;

  .description{
    width: 100%;
    font-size: 16px;
    line-height: 23px;
    color: #666;
    margin-top: 20px;
  }
  .image{
    width: 60%;
    padding: 0 20px;
    border: 2px solid #DDD;
    border-radius: 4px;
    img {
      align-self: center;
      width: 100%;
    }
    @media screen and (max-width: 992px) {
      width: 50%;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
  .infos{
    display: flex;
    flex-direction: column;
    justify-content: flex-start
    width: 40%;
    padding: 20px;
    @media screen and (max-width: 992px) {
        width: 50%;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      padding: 20px 0;
    }
    > h1 {
      font-size: 30px;
      line-height: 35px;
      color: #333;
      margin-top: 5px;
      margin-bottom: 30px;
    }

    > span {
      font-size: 25px;
      font-weight: bold;
      margin: 5px 0 20px;
      color: #f60;
    }

    button {
      background: #f60;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 30px;
      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f60')};
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
