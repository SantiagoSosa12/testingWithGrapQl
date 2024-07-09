import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { RepoData, SearchCriteria } from '../api/types';
import { starRepo } from '../api/startRepo';
import { getRepo } from '../api/getRepo';
import { SearchRepoForm } from './SearchRepoForm';
import FoundRepo from './FoundRepo';
import StartRepoButton from './StartRepoButton';

const RepoPage = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria | undefined>();
  const { data } = useQuery({
    queryKey: ['repo', searchCriteria],
    queryFn: () => getRepo(searchCriteria as SearchCriteria),
    enabled: searchCriteria !== undefined,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: starRepo,
    onSuccess: () => {
      queryClient.setQueryData<RepoData>(['repo', searchCriteria], (repo) => {
        if (repo === undefined) {
          return undefined;
        }
        return {
          ...repo,
          viewerHasStarred: true,
        };
      });
    },
  });

  function handleSearch(search: SearchCriteria) {
    setSearchCriteria(search);
  }

  function handleStarClick() {
    if (data) {
      mutate(data.repository.id);
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
