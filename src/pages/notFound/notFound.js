import NotFoundPage from '../../modules/NotFound/NotFoundPage';


const NotFound = () => {

    const  component = NotFoundPage()

    return component
}

document.querySelector('#root').innerHTML = NotFound();

