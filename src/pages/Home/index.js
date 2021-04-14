import './style.css';

import Posts from '../../components/Posts';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';

class Home extends Component{

  state = {
    posts: [], //Estado dos posts
    allPosts: [], //Estados de todos os posts para paginação
    page: 0, //Paginas que iram ser renderizados ao carregar a pagina
    postsPerPage: 2, //Quantidade de paginas que ira carregar ao clicar no botao
    searchValue: '' //Valor inicial do campo de pesquisa
  };

  async componentDidMount(){
    await this.loadPosts();
  }

  //Função para carregar os posts
  loadPosts = async () => {

    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage), 
      allPosts: postsAndPhotos 
    });

  }

  //Função de paginação
  loadMorePosts = () => {

    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextsPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextsPosts);

    this.setState({ posts, page: nextPage });

  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
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

    return (
      <section className="container">

        <div className="search-container">
          {
            !!searchValue //Pega valor do input ao digitar
            &&
            <h1>Pesquisa: { searchValue }</h1>
          }

          <TextInput 
            handleChange={ this.handleChange }
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
            handleFunction={ this.loadMorePosts } 
            disabled={ noMorePosts }
          />
        )}        

      </section>
    );
  }
}

export default Home;
