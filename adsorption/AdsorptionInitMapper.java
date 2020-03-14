import org.apache.hadoop.mapreduce.*;
import java.io.IOException;

import org.apache.hadoop.io.*;

public class AdsorptionInitMapper extends Mapper<LongWritable, Text, Text, Text> {

	@Override
	public void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
		String line = value.toString();

		if (!line.contains(":")) {
			String name = line;
			context.write(new Text(name), new Text("nothing"));
		} else {
			String[] splitNameInterests = line.split(":");
			String name = splitNameInterests[0];
			String[] splitInterests = splitNameInterests[1].split(",");
			for (int i = 0; i < splitInterests.length; i++) {
				String interest = splitInterests[i];
				context.write(new Text(name), new Text(interest));
				String keyForInterest = "*" + interest;
				context.write(new Text(keyForInterest), new Text(name));
			}
		}


	}
}