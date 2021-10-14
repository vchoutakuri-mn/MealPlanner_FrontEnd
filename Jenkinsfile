pipeline {
  agent any
  tools {nodejs "node"}
  stages {
    stage('Test') {
      steps {
   
        bat 'npm install'
        echo 'Running successfully'
      }}
    stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }

  
  }}
