import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    a {
      display: flex;
      flex-direction: column;
      color: #333;
      text-decoration: none;
      &:hover {
        color: #f60;
      }
      img {
        align-self: center;
        max-width: 250px;
      }

      > strong {
        font-size: 16px;
        line-height: 20px;
        margin-top: 5px;
      }

      > span {
        font-size: 21px;
        font-weight: bold;
        margin: 5px 0 20px;
      }
    }
    button {
      background: #f60;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;

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

export const SearchBar = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  div {
    display: flex;
    align-items: center;
    svg {
      margin-right: 10px;
    }
    input {
      font-size: 16px;
      color: #333;
      width: 100%;
      padding: 10px 10px;
      border-radius: 4px;
      border: 1px solid #999;
      background: #ddd;
      &:focus {
        background: #fff;
      }
    }
  }

  .notfound {
    width: 100%;
    font-size: 16px;
    color: #666;
    margin-top: 15px;
    display: flex;
    justify-content: center;
  }
`;
