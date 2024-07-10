import { useLazyQuery, useMutation, useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { SearchCriteria } from '../api/types';
import { STAR_REPO } from '../api/startRepo';
import { GET_REPO } from '../api/getRepo';
import { SearchRepoForm } from './SearchRepoForm';
import FoundRepo from './FoundRepo';
import StartRepoButton from './StartRepoButton';

const RepoPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();
  const [getRepo, { data }] = useLazyQuery(GET_REPO);
  const queryClient = useApolloClient();
  const [startRepo] = useMutation(STAR_REPO, {
    onCompleted: () => {
      queryClient.cache.writeQuery({
        query: GET_REPO,
        data: {
          repository: {
            ...data.repository,
            viewerHasStarred: true,
          },
        },
        variables: searchCriteria,
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    getRepo({
      variables: { ...search },
    });
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      startRepo({ variables: { repoId: data.repository.id } });
    }
  }

  return (
    <main className="max-w-xs ml-auto mr-auto">
      <SearchRepoForm onSearch={handleSearch} />
      {data && (
        <>
          <FoundRepo
            name={data.repository.name}
            description={data.repository.description}
            starts={data.repository.stargazers.totalCount}
          />
          {!data.repository.viewerHasStarred && <StartRepoButton onClick={handleStarClick} />}
        </>
      )}
    </main>
  );
};

export default RepoPage;
