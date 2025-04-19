import { useEffect } from "react";

import useDispatch from "../../hooks/useDispatch";
import { fetchAuthUser } from "../../features/auth/authSlice";

function UserProvider() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  return null;
}
export default UserProvider;
