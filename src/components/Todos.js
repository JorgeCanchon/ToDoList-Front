import React, { useState, Fragment, useEffect } from 'react';
import { Table, Button, Spin , message, Popconfirm } from 'antd';
import { GetAll, DeleteTodo, AddTodo } from '../services/taskRequest';
import { GetAll as GetAllCategoria }  from '../services/categoriaRequest';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { setTodos, deleteTodo, addTodo } from '../redux/todo/index';
import { setCategorias } from '../redux/categoria/index';

import MyModal from './Modal';
import FormTodo from './FormTodo';

export const Todos = () => {

  const categorias = useSelector((state) => state.categorias.categorias);

  const columns = [
    {
      title: 'Id Tarea',
      dataIndex: 'id',
      width: '10%',
    },
    {
      title: 'Titulo',
      dataIndex: 'titulo',
      width: '20%',
    },
    {
      title: 'Descripcion',
      dataIndex: 'descripcion',
      width: '20%',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      width: '20%',
    },
    {
      title: 'Eliminar',
      dataIndex: 'Eliminar',
      render: (text, record) =>
          todos.length >= 1 ? (
              <Popconfirm title="¿Esta seguro de eliminar?" onConfirm= { () => handleDelete(record.key)}>
                <a>Eliminar</a>
              </Popconfirm> 
          ) : null,
    }
  ];

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [todoState, setTodoState] = useState([]);

  const onChangeSwitch = e => {
      setChecked(e);
  }
  const dispatch = useDispatch();

  const { todos } = useSelector(
    state => ({
      todos: state.todos.todos
    }),
    shallowEqual
  );

  useEffect(() => {
    getDataTodo();
    getDataCategorias();
  }, []);

  const getDataTodo = async () => {
    let data = await GetAll();
    switch(data.status){
      case 200:
        data = data.data.result.map(x => ({ ...x, key: x.id, completed: x.completed ? 'SI': 'NO'}
        ));
        setTodoState(data);
        dispatch(setTodos(data));
        break;
      case 204:
        message.warning('No se encontraron tareas');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
    }
    setLoading(false);
  }

  const getDataCategorias = async () => {
    let data = await GetAllCategoria();
    switch(data.status){
      case 200:
        data = data.data.result.map(x => ({ ...x, key: x.id}));
        dispatch(setCategorias(data));
        break;
      case 204:
        message.warning('No se encontraron tareas');
        break;
      default:
        message.error('Ocurrio un error al consultar los datos');
    }
    setLoading(false);
  }

  const handleDelete = async key => {    
    let res = await DeleteTodo(key);
    if(res.status === 200){
      message.success('Tarea eliminada con éxito');
      let data = todoState.filter(x => x.id !== key);
      setTodoState(data);
      dispatch(deleteTodo(key));
    }else{
      message.error('Ocurrio un error al eliminar la tarea');
    }
  }

  const handleAdd = _ => {
    setVisible(true);
  }

  const handleOk = async e => {
    let entity = 
    {
      "titulo": e.titulo,
      "descripcion": e.descripcion,
      "categoriaId": e.categoriaId,
      "fechaLimite": e.fecha.toDate(),
      "estado": checked ? "Finalizada": "En curso",
    }

    let res = await AddTodo(entity);
    switch(res.status){
      case 200:
      case 201:
        let data = { 
          id: res.data.result,
          ...entity,
          key: res.data.result
        };
        setTodoState([...todoState, data]);
        dispatch(addTodo(data));
        message.success('Tarea agregada con éxito');
        break;
        default:
          message.error('Ocurrio un error al agregar la tarea');
    }
    setVisible(false);
  }

  const handleCancel = _ => {
    setVisible(false);
  };

  if (loading)
      return(
      <Fragment>
          <Spin />
      </Fragment>);
  return (
    <Fragment>
      <Button onClick={handleAdd} type='primary' style ={{marginBottom:16}}>
        Agregar Tarea
      </Button>
      <MyModal 
        title='Agregar Tarea'
        content={<FormTodo onFinish={handleOk.bind(this)} checked={checked} onChange={onChangeSwitch} categorias={categorias} />}
        visible={visible}
        handleCancel={handleCancel.bind(this)}
       />
      <Table columns={columns} dataSource={todoState} rowKey="id" />
    </Fragment>
  );
}

export default Todos;