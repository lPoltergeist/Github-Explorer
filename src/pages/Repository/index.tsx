import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import  api  from '../../services/api'

import logoImg from '../../assets/logo.svg';

interface RepositoryParams {
    repository: string;
}

interface Repositories {
    full_name: string,
    description: string;
   stargazers_count: number;
   forks_count: number;
   open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string; 
    }
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }

}

const Repository: React.FC = () => {
const [ repository, setRepository ] = useState<Repositories | null >(null);
const [ issues, setIssues ] = useState<Issue[]>([]);


    const { params } = useRouteMatch<RepositoryParams>();

useEffect(() => {
api.get(`repos/${params.repository}`).then(response => {
    setRepository(response.data);
})


api.get(`repos/${params.repository}/issues`).then(response => {
  setIssues(response.data);
})
}, [params.repository]);

    return  ( 
        <>
    <Header>
<img src={ logoImg } alt="Github Explorer" />
<Link to="/">
    <FiChevronLeft size={16} />
    Back
</Link>
    </Header>
{
    repository && (
        <RepositoryInfo>
       <header>
           <img  src={repository.owner.avatar_url} 
           alt={repository.owner.login}/>
           <div>
               <strong>{repository.full_name}</strong>
               <p>{repository.description}</p>
           </div>
           </header> 
           <ul>
               <li>
                   <strong>{repository.stargazers_count}</strong>
                   <span> Stars </span>
               </li>
               <li>
                   <strong>{repository.forks_count}</strong>
                   <span> Forks </span>
               </li>
               <li>
                   <strong>{repository.open_issues_count}</strong>
                   <span> Issues </span>
               </li>
           </ul>
   </RepositoryInfo>

    )
}   

   
   <Issues>

  {issues.map(issue => (
       <a key={issue.id} href={issue.html_url}>
       
       <div>
           <strong>{issue.title}</strong>
           <p> {issue.user.login} </p>
            </div>
            <FiChevronRight size={ 20 }/>
           </a>
  ))}

   </Issues>

   
   
   
    </>
    );
};

export default Repository