import styles from './AddScore.module.css';
import {type FormEvent, useState} from "react";
import {useAppSelector} from "../store/hooks.ts";
import {selectedStudent} from "../store/slices/studentSlice.ts";
import {useNavigate} from "react-router-dom";
import {useAddScoreMutation} from "../store/api/studentApi.ts";

const AddScore = () => {

  const student = useAppSelector(selectedStudent)
  const navigate = useNavigate();

  const [exam, setExam] = useState("")
  const [score, setScore] = useState(0)
  const [addScore] = useAddScoreMutation()

  const handleAddScore = (e: FormEvent) => {
    e.preventDefault()
    addScore({id: student!._id, data: {exam, score}})
    navigate(`/students/${student?._id}`)
  }

  const handleCancel = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/students/${student?._id}`)
  }

  return (
    <div>
      <form onSubmit={handleAddScore}>
        <label>
          Exam:
          <input
            className={styles.formField}
            type="text"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            required
          />
        </label>
        <div>
          <label>
            Score:
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(+e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className={styles.btn}>Add score</button>
        <button type="button" className={styles.btn} onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default AddScore;