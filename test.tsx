/**
 * Technical Test: Senior Frontend Developer - React & TypeScript
 *
 * Complete the tasks below. Ensure you consider best practices, readability, and efficient code.
 *
 * Your code will be evaluated based on correctness, type safety, adherence to React principles, and best practices.
 */

// 1. TypeScript Basics

// 1.1. Define a type for a `User` object.
type User = {
  // TODO: Define properties for id, name, email, and an optional profilePhotoUrl.
  id: string
  name: string
  email: string
  profilePhotoUrl?: string | null
}

// 2. React Component

// 2.1. Create a functional component that takes in a User and displays their name and email.

type UserProps = {
  user: User
}

const UserProfile: React.FC<UserProps> = ({ user }) => {
  // TODO: Return a JSX that displays user's name and email.
  return (
    <div>
      <p>
        <bold>Name:</bold>&nbsp;{user.name}
      </p>
      <p>
        <bold>Email:</bold>&nbsp;{user.email}
      </p>
    </div>
  )
}

// 3. State and Lifecycle

// 3.1. Convert the following functional component to a class component.

type CounterProps = {
  initialCount: number
}

const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  const [count, setCount] = React.useState(initialCount)

  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  )
}

// TODO: Convert the above Counter component to a class component.

class Counter extends React.Component<CounterProps, { count: number }> {
  state = {
    count: this.props.initialCount,
  }

  handleOnClick = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.handleOnClick}>Increase</button>
      </div>
    )
  }
}

// 4. React Hooks

// 4.1. Create a custom hook `useLocalStorage` that syncs with local storage.

const useLocalStorage = (key: string, initialValue: any) => {
  // TODO: Implement the useLocalStorage hook which will get, set, or remove a key from localStorage.
  // Bonus: Ensure it works with any type (e.g., string, number, object, array).
  const [value, setValue] = React.useState<any | null>(null)

  const setItem = (value: any) => {
    setValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  const removeItem = () => {
    setValue(null)
    localStorage.removeItem(key)
  }

  React.useEffect(() => {
    const stringValue = localStorage.getItem(key)

    if (!stringValue) {
      setValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      try {
        const parsedValue = JSON.parse(`{value: ${stringValue}}`)
        setValue(parsedValue.value)
      } catch (e) {
        setValue(stringValue)
      }
    }
  }, [])

  return {
    value,
    setItem,
    removeItem,
  }
}

// 5. React Context

// 5.1. Set up a user context and a context provider.

// TODO: Create a UserContext and a UserProvider component.

const UserContext = React.createContext<User>({
  id: '',
  name: '',
  email: '',
  profilePhotoUrl: null,
})

const UserProvider = (props: any) => {
  const [user, setUser] = React.useState<User | null>(null)

  const value = {
    user,
    setUser,
  }

  return <UserContext.Provider value={value} {...props} />
}

// 6. Advanced TypeScript with React

// 6.1. Given the generic type below, use it in a component that can render either strings or numbers.

type RenderProp<T> = {
  data: T
  render: (item: T) => JSX.Element
}

// TODO: Create a component using RenderProp type that can render either strings or numbers.

const RenderComponent: React.FC<RenderProp<string | number>> = ({
  data,
  render,
}) => {
  return render(data)
}

// 7. Practical Application

// 7.1. Write a higher-order component (HOC) that logs the props of the wrapped component.

const withLoggedProps = <P extends object>(
  Component: React.ComponentType<P>
) => {
  // TODO: Return a new component that logs the props and then renders the passed Component.
  const NewComponent = (props) => {
    console.log(props)
    return <Component {...props} />
  }

  return NewComponent
}
