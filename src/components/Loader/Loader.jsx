import Loader from 'react-loader-spinner';
import s from './Loader.module.scss';
export default function Spinner({loading}) {
  return (
    <>
      <li className={s.spinner}>
        <Loader
          type="ThreeDots"
          color="gray"
          height={50}
          width={50}
          visible={loading}
          // timeout={2000}
        />
      </li>
    </>
  );
}
