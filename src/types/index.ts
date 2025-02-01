export interface Task {
  id: string;
  task: string;
  isCompleted: boolean;
}

export interface TaskProps {
  task: Task;
  handleChangeStatus: (id: string) => void;
  handleDelete: (id: string) => void;
}
export interface ButtonProps {
  title: string;
  handleClick: () => void;
  isPrimary: boolean;
  disabled: boolean;
}
