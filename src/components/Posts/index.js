import './style.css';

import PostCard from '../PostCard';

export default function Posts({ posts }){
    return(
        <div className="posts">

          {posts.map(value => (

            <PostCard  
              key={ value.id }
              title={ value.title }
              body={ value.body }
              cover={ value.cover }
            />

          ))}

        </div>
    );
}