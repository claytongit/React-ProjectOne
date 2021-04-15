import './style.css';

import Posts from '../../components/Posts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import { useState, useEffect, useCallback } from 'react';
import { loadPosts } from '../../utils/load-posts';

export default function Home(){

  const [posts, setPosts] = useState([]);  //Estado dos posts
  const [allPosts, setAllPosts] = useState([]); //Estados de todos os posts para paginação
  const [page, setPage] = useState(0); //Paginas que iram ser renderizados ao carregar a pagina
  const [postsPerPage] = useState(2); //Quantidade de paginas que ira carregar ao clicar no botao
  const [searchValue, setSearchValue] = useState(''); //Valor inicial do campo de pesquisa

  const noMorePosts = page + postsPerPage >= allPosts.length; //Desativar botao se tiver acabado os posts

  const filterPosts = !!searchValue 
  ? 
    allPosts.filter(post => { //Filtra todos os posts
      //Transforma todos os titulos em letra minuscula, includes incluir os searchValue em letra minusculas
      return post.title.toLowerCase().includes(searchValue.toLowerCase());
    })
  : 
    posts
  ;  

  //Função para carregar os posts
  const handleLoadPosts = useCallback( async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(()=>{
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  //Função de paginação
  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextsPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextsPosts);
    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className="container">

      <p>{new Date().toLocaleString('pt-br', { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric' })}</p>

      <div className="search-container">
        {
          !!searchValue //Pega valor do input ao digitar
          &&
          <h1>Pesquisa: { searchValue }</h1>
        }

        <TextInput 
          handleChange={ handleChange }
          searchValue={ searchValue }
        />
      </div>
      
      {filterPosts.length > 0 && ( //Se existir na pesquisa algum post = mostra os posts
        <Posts posts={ filterPosts } />
      )}      

      {filterPosts.length === 0 && ( //Se não existir na pesquisa algum post = mostra paragrafo
        <p>Não existi nenhum post com esse titulo</p>
      )}   
      
      {!searchValue  //Desaparecer botão ao digitar no input
      && (
          <Button 
          text="Carregar mais posts" 
          handleFunction={ loadMorePosts } 
          disabled={ noMorePosts }
        />
      )}        

    </section>
  );
}