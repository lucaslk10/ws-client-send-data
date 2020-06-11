pipeline {
	environment {
		registry = 'artifactory.dimensiondata.com:443'
		registryCredential = ''
        repositoryPath = 'docker-local/br_software_engineering/stack'
        containerName = 'ws-listener-oracle'
        version = ''
        gitCommitterAuthor = sh(script: "git show -s --pretty=%an", returnStdout: true).replaceAll(~/\n/,"")
	}
    agent any
    stages {
        stage('Build') {
            steps {
				echo 'Building..'
                sh '/usr/bin/npm rebuild node-sass'
                sh '/usr/bin/npm install'
                sh '/usr/bin/npm run build'
                // sh 'mkdir -p ./cert'
                // sh 'cp /var/www/certificates/* ./cert/'
                script{
                    def props = readProperties  file: '.env.dev'
                    version = props["VERSION"]
                    def image = docker.build("${registry}/${repositoryPath}/${containerName}:${version}-$BUILD_NUMBER")
                    def tag = sh(script: "/usr/bin/docker images --filter=reference=${registry}/${repositoryPath}/${containerName}:${version}-$BUILD_NUMBER --format {{.ID}}", returnStdout: true).replaceAll(~/\n/,"")
                    sh "/usr/bin/docker tag ${tag} ${registry}/${repositoryPath}/${containerName}:${version}-$BUILD_NUMBER"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
                script{
                    def id = sh(script: "/usr/bin/docker ps -a --filter=name=${containerName} -q", returnStdout: true).replaceAll(~/\n/,"")
                    if(id?.trim()){
                        sh "/usr/bin/docker rm --force ${id}"
                    }
                    def props = readProperties  file: '.env.dev'
                    def port = props["PORT"]
                    docker.image("${registry}/${repositoryPath}/${containerName}:${version}-$BUILD_NUMBER").run("-p ${port}:${port} -v /var/www/${containerName}/log/:/var/www/log --restart=always --name ${containerName}")
                }
            }
        }
        stage('Clean Up') {
            steps {
                echo 'Cleaning....'
				sh 'git clean -f -x'
            }
        }
    }
    post {
        success {
            emailext subject: "$JOB_NAME - Build $BUILD_DISPLAY_NAME - SUCCESS!",
            body: "$JOB_NAME - Build $BUILD_DISPLAY_NAME - SUCCESS!\n\nCheck console output at $BUILD_URL to view the results.",
            recipientProviders: [
                [$class: 'RequesterRecipientProvider']
            ],
            replyTo: '$DEFAULT_REPLYTO',
            to: '$DEFAULT_RECIPIENTS'
        }
        failure {
            emailext subject: "$JOB_NAME - Build $BUILD_DISPLAY_NAME - FAILURE!",
            body: "$JOB_NAME - Build $BUILD_DISPLAY_NAME - FAILURE!\n\nCheck console output at $BUILD_URL to view the results.",
            recipientProviders: [
                [$class: 'RequesterRecipientProvider']
            ],
            replyTo: '$DEFAULT_REPLYTO',
            to: '$DEFAULT_RECIPIENTS'
        }
    }
}
