import styled from "styled-components";

export const CreateArticlePage = () => {
  return (
    <Container>
      <Title>Create Article</Title>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 70%;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  font-family: Arial;
`;
