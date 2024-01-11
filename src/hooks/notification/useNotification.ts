import useUser from "@/hooks/auth/useUser";
import {
  addNotification,
  deleteNotification,
  getNotification,
  readNotification,
} from "@/remote/notification";
import { useMutation, useQuery, useQueryClient } from "react-query";

function useNotification() {
  const user = useUser();
  const client = useQueryClient();

  //notification 조회
  const { data: notifications, isLoading: loadingNotifications } = useQuery(
    ["notifications", user],
    () => getNotification({ userId: user?.uid as string }),
    { enabled: !!user }
  );

  //notification 읽음
  const { mutate: read } = useMutation(
    (notificationId: string) => readNotification(notificationId),
    {
      onSuccess: () => {
        client.invalidateQueries(["notifications", user]);
      },
    }
  );

  //notification 삭제
  const { mutate: remove } = useMutation(
    (notificationId: string) => deleteNotification(notificationId),
    {
      onSuccess: () => {
        client.invalidateQueries(["notifications", user]);
      },
    }
  );

  //notification 추가
  const { mutate: add } = useMutation(
    ({
      content,
      userId,
      url,
    }: {
      content: string;
      userId: string;
      url: string;
    }) => {
      const newNotification = {
        createdAt: new Date(),
        userId,
        content,
        url,
        isRead: false,
      };
      return addNotification({ notification: newNotification });
    }
  );

  return { notifications, loadingNotifications, read, remove, add };
}

export default useNotification;
