import { IContainer } from '../../interfaces/Container.interface';
import { ContainerStyles } from './Container.styled';

const Container = ({ children }: IContainer) => (
  <ContainerStyles>{children}</ContainerStyles>
);

export default Container;
