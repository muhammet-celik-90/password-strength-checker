import Input from './components/input/Input';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Password Strength Checker</h1>
      <Input/>
    </main>
  )
}
