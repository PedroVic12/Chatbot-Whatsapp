class LogScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("Logs")),
        body: FutureBuilder(
          future: getLogs(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              var logs = snapshot.data;
              return ListView.builder(
                itemCount: logs.length,
                itemBuilder: (context, index) {
                  var log = logs[index];
                  return ListTile(
                    title: Text(log.message),
                    subtitle: Text("${log.level} ${log.date}"),
                  );
                },
              );
            } else {
              return Center(child: CircularProgressIndicator());
            }
          },
        ));
  }
}

Future<List<Log>> getLogs() async {
  var response = await http.get('https://your.api.url/logs');
  var jsonLogs = json.decode(response.body);
  return jsonLogs.map((log) => Log.fromJson(log)).toList();
}

class Log {
  String message;
  String level;
  DateTime date;

  Log({this.message, this.level, this.date});

  factory Log.fromJson(Map<String, dynamic> json) {
    return Log(
        message: json['message'],
        level: json['level'],
        date: DateTime.parse(json['date']));
  }
}
