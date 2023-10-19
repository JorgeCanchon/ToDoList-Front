import React from 'react';
import { Layout } from 'antd';
import Todos from '../components/Todos';
const { Header, Content, Footer } = Layout;

export const TodoContainer = () => {
    return (
        <Layout>
            <Header>
                <h3 style={{color:'#ffffff'}}>Tareas</h3>
            </Header>
            <Content style={{margin: '15px'}}>
                <Todos /> 
            </Content>
            <Footer>Copyright&copy; {new Date().getFullYear()} - Página creada por Jorge Canchon - Todos los derechos reservados </Footer>
      </Layout>
    );
}

export default TodoContainer;