pipeline {
  agent any
  tools {nodejs "node"}
  stages {
    stage('Test') {
      steps {
   
        bat 'npm install'
        echo 'Running successfully'
      }}
      stage('Build') {
      steps {
        bat 'npm run build'
        echo 'build sucessful'
        }
          
      }
  
  }}
