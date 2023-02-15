import docker

client = docker.DockerClient(base_url='unix://var/run/docker.sock')

containers = client.containers.list()

print("Containers:")
for container in containers:
    print(container.name)
