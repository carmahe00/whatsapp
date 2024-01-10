import { useCallback, useEffect } from 'react'
import { Sidebar } from '../components/sidebar'
import { useAppDispatch, useAppSelector } from '../app/store'
import { selectUser } from '../features/userSlice'
import { getConversation } from '../features/chatSlice'

const Home = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(rootState => selectUser(rootState));
  // Memoize the dispatch function
  const memoizedDispatch = useCallback(dispatch, [dispatch])
  useEffect(() => {
    if (user.acces_token)
    memoizedDispatch(getConversation(user.acces_token))
  }, [user, memoizedDispatch])

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center py-[19px] overflow-hidden">
      <div className="container h-screen flex">
        <Sidebar />
      </div>
    </div>
  )
}

export default Home