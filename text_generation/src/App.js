import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './App.css';

function App() {
  
  const generateText = () =>{
      const seedText = document.getElementById('seedText');
      const nextWord = document.getElementById('nextWord');
      const wordLength = document.getElementById('wordLength');
      const generatedOutput = document.getElementById('generatedOutput')
      const formData = new URLSearchParams();
      formData.append('seedText', seedText.value);
      formData.append('wordLength', parseInt(wordLength.value));
      formData.append('nextWord', parseInt(nextWord.value));
      fetch(" http://127.0.0.1:5000/generate_text",{
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      }).then(res => res.json()).then(data=>{
        // console.log(data['generatedText']);
        generatedOutput.innerHTML = "<p>"+data['generatedText']+"</p>";
      }).catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div className='container w-50'>
      <h1>Text Generation</h1>
    <Form>
    <Form.Group className="mb-3">
        <Form.Label>Seed Test</Form.Label>
        <Form.Control as="textarea" rows={2} id="seedText" type="text"/>
      </Form.Group>
      
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Word Length</InputGroup.Text>
        <Form.Control
          aria-describedby="basic-addon1"
          type='number'
          defaultValue="19"
          id = "wordLength"
          />
      </InputGroup>
      
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon2">Next Word</InputGroup.Text>
        <Form.Control
          aria-describedby="basic-addon2"
          type='number'
          defaultValue="10"
          id="nextWord"
        />
      </InputGroup>
      <Button variant="primary" className="submit" onClick={generateText}>Submit</Button>

      <Form.Group className="mb-3">
        <Form.Label>Generated Text : </Form.Label>
        <div className="output" id="generatedOutput"><p></p></div>
      </Form.Group>
    </Form>
    </div>
  );
}

export default App;
